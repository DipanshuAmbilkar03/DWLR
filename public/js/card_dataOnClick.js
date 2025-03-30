const opener = {
    viewDetails(id) {
        window.location.href = "/alert/" + id;
    }
};

window.opener = opener;
