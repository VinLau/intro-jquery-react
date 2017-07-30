(function () {

    var LARGETHUMBNAILSUFFIX = "_b";
    var SMALLTHUMBNAILSUFFIX = "_t";

    function getPhotosFromSearch(searchTerm) {
        var baseAPIURL = "http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=be7e284c7c8bc84c932bccd6c537f5b7&text=" //trashed API key :)

        var fullAPIURL = baseAPIURL + searchTerm;

        return (
            $.getJSON(fullAPIURL)
                .then(dataJSON => {
                    var photoJSONArray = dataJSON.photos.photo.map(function (photoItem) {
                        return {
                            title: photoItem.title,
                            thumb: "https://farm" + photoItem.farm + ".staticflickr.com/" + photoItem.server + "/" + photoItem.id + "_" + photoItem.secret + SMALLTHUMBNAILSUFFIX + ".jpg",
                            large: "https://farm" + photoItem.farm + ".staticflickr.com/" + photoItem.server + "/" + photoItem.id + "_" + photoItem.secret + LARGETHUMBNAILSUFFIX + ".jpg"
                        };
                    });
                    return photoJSONArray;
                })
        );
    }

    function createFlickrThumb(photoData) {

        return ( // LOOK MA! No variable declarations needed!
            $("<a></a>")
                .attr({
                    href: photoData.large,
                    target: "_blank"
                })
                .append(`<img src=${photoData.thumb} alt=${photoData.title}>`)

        );

    }

    $(".flickr-form").submit(event => {
        event.preventDefault();
        getPhotosFromSearch($(".search-input").val())
            .then(photoArray => {
                photoArray.forEach(function (photoObj) {
                    $(".photos-container").append(createFlickrThumb(photoObj));
                });
            });
    });

})();