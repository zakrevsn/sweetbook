(function() {
    new Vue({
        el: "#main",
        data: {
            images: [],
            form: {
                title: "",
                description: "",
                username: "",
                file: null
            },
            selectedImage: null
        },
        created: function() {
            console.log("created");
        },
        mounted: function() {
            var self = this;
            // in the nested scope this is loosing it's meaning
            console.log("mounted");
            axios.get("/images").then(function(res) {
                self.images = res.data;
            });
        },
        updated: function() {
            console.log("updated");
        },
        // every single function that runs to res to an event will be defined in methods;
        methods: {
            handleFileChange: function(e) {
                console.log("file:", e.target.files[0]);
                // this stores the file that was just selected in the 'file' property of data object;
                this.form.file = e.target.files[0];
            },
            closePopup: function() {
                this.selectedImage = null;
                document.body.classList.remove("noScroll");
            },
            uploadFile: function() {
                var self = this;
                // formData(browser api) is used to send FILES to server!
                var formData = new FormData();
                formData.append("file", this.form.file);
                formData.append("username", this.form.username);
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);
                // logging formData gives you an empty object, that's ok, it's working;
                console.log("formData", formData);

                axios.post("/upload", formData).then(function(res) {
                    console.log("then of POST/upload");
                    self.images.unshift(res.data[0]);
                });
            },
            click: function(img) {
                this.selectedImage = img;
            },
            showMore: function() {
                console.log("showMore");
                var self = this;
                let lastId = null;
                if (!this.images.length) {
                    return;
                }
                lastId = this.images[this.images.length - 1].id;
                axios
                    .get("/images", { params: { lastId } })
                    .then(function(res) {
                        console.log(res);
                        self.images = self.images.concat(res.data);
                    });
            },
            haveMore: function() {
                return (
                    this.images.length > 0 &&
                    this.images[this.images.length - 1].id >
                        this.images[this.images.length - 1].min
                );
            }
        }
    });
})();
