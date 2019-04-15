(function() {
    new Vue({
        el: "#main",
        data: {
            images: []
        },
        created: function() {
            console.log("created");
        },
        mounted: function() {
            console.log("mounted");
            axios.get("/images").then(res => {
                this.images = res.data;
            });
        },
        updated: function() {
            console.log("updated");
        },
        methods: {
            click: function() {
                // this.add.funkyTown;
            }
        }
    });
})();
