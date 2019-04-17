Vue.component("image-popup", {
    template: "#image-popup",
    data: function() {
        return {
            id: null,
            url: null,
            username: null,
            title: null,
            description: null,
            created_at: null,
            comments: [],
            form: {
                username: "",
                comment: null
            }
        };
    },
    mounted: function() {
        var self = this;
        axios.get("/comments/" + this.id).then(res => {
            self.comments = res.data;
        });
    },
    props: ["id", "url", "username", "title", "description", "created_at"],
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
            axios.post("/comments/" + this.id, formData).then(res => {
                self.comments.unshift(res.data[0]);
            });
        }
    }
});
