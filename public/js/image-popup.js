Vue.component("image-popup", {
    template: "#image-popup",
    data: function() {
        return {
            // imageId: "",
            // url: "",
            // username: "",
            // title: "",
            // description: "",
            // timestamp: "",
            comments: [],
            form: {
                username: "",
                comment: ""
            }
        };
    },
    mounted: function() {
        var self = this;
        // axios.get("/images/" + this.id).then(function(res) {
        axios.get("/comments/" + this.imageId).then(function(res) {
            console.log(res);
            self.comments = res.data;
        });
        document.body.classList.add("noScroll");
    },
    props: ["imageId", "url", "username", "title", "description", "created_at"],

    methods: {
        // click: function() {
        //     this.name = this.funky;
        //     this.$emit("change", this.funky);
        // },
        addComment: function(username, comment) {
            var self = this;
            let formData = new FormData();
            formData.append("comment", comment);
            formData.append("username", username);
            axios
                .post("/comments/" + this.imageId, { username, comment })
                .then(function(res) {
                    self.comments.unshift(res.data[0]);
                });
        }
    }
});
