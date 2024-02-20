import { storage, db } from "../firebase";

/**
 * A content fetching service to be called from the top level app
 *   to preload content and images into the cache
 * It's messier than it needs to be since the data structures aren't very consistent.
 */
class ContentFetchService {
  /**
   * Parameters to specify where the images are that should be loaded
   * @param {string} collection
   * @param {string} document
   * @param {string | array} field
   */
  constructor(collection, document, field, field2) {
    this.collection = collection || "general";
    this.document = document || "static";
    this.field = field || "photos";
    return (async () => {
      await this.getContent();
      this.photos = await this.cachePhotos(field);
      await this.cacheVideo();
      await this.cacheAudio();
      if (field2) {
        this.icons = await this.cachePhotos(field2);
      }
      return this;
    })();
  }

  async getContent() {
    await db
      .collection(this.collection)
      .doc(this.document)
      .get()
      .then((result) => {
        const content = result.data();
        // sort arrays which contain an indexing element
        Object.keys(content).forEach((key) => {
          if (content[key][0] && content[key][0].hasOwnProperty("index")) {
            content[key].sort((a, b) => a.index - b.index);
          }
        });
        this.content = content;
      });
  }

  async cachePhotos(field) {
    let photos = {};
    if (typeof field === "string") {
      this.content &&
        this.content[field] &&
        this.content[field].forEach((photo) => {
          storage
            .child(typeof photo !== "string" ? photo.title : photo)
            .getDownloadURL()
            .then((url) => {
              const img = new Image();
              img.src = url;
              photos[photo.index ? photo.index : photo.split(".")[0]] = img;
            });
        });
    } else {
      // todo: obvs this will only work for a specific style of array;
      //    should make this work for any size of array
      this.content &&
        this.content[field[0]] &&
        this.content[field[0]].forEach((project) => {
          project[field[1]] &&
            project[field[1]].forEach((photo) => {
              storage
                .child(field[2] ? photo[field[2]] : photo)
                .getDownloadURL()
                .then((url) => {
                  const img = new Image();
                  img.src = url;
                  if (field[2]) {
                    img.alt = photo[field[3]];
                  }
                  if (!photos[project.title]) {
                    photos[project.title] = {};
                  }
                  if (field[2]) {
                    photos[project.title][photo[field[2]]] = img;
                  } else {
                    photos[project.title][photo] = img;
                  }
                });
            });
        });
    }
    return photos;
  }

  async cacheVideo() {
    this.videos = {};
    this.content &&
      this.content[this.field[0]] &&
      this.content[this.field[0]].forEach((project) => {
        project.video &&
          storage
            .child(project.video)
            .getDownloadURL()
            .then((url) => {
              const vid = document.createElement("video");
              vid.src = url;
              if (!this.videos[project.title]) {
                this.photos[project.title] = {};
              }
              this.videos[project.title] = vid;
            });
      });
  }

  async cacheAudio() {
    this.audio = {};
    this.content &&
      this.content.albums &&
      this.content.albums.forEach((album) => {
        album.songs.forEach((song) => {
          if (song.file) {
            storage
              .child(song.file)
              .getDownloadURL()
              .then((url) => {
                if (!this.audio[album.title]) {
                  this.audio[album.title] = [];
                }
                this.audio[album.title] = [
                  ...this.audio[album.title],
                  { album: album.title, title: song.title, url: url },
                ];
              });
          }
        });
      });
  }
}

export default ContentFetchService;
