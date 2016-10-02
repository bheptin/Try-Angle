

    $(document).ready(function(){

        $('#gif_search').bind('submit', function() {
            $(".jumbotron").hide();
            terms = $('#search_terms').val();
            apiURL = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=100";
            $.ajax({
                url: apiURL,
                type: 'GET',
                success: function(data) {
                  ///console.log(data);
                  var random = Math.ceil(Math.random() * 100);
                  var randomGifURL = data.data[random].images.original.url;
                  var gifSection = `<div><p>Giphy <em>"${terms}"</em>
                  <span class='heartGiph'><i class="fa fa-heart-o" aria-hidden="true"></i></span></p>
                  <p class="gif"><img src="${randomGifURL}" alt="" /></p></div>`;
                  $("#gif_container").prepend(gifSection);

                }
            });
            return false;
        })
        $("#gif_container").on("click", ".fa", function (event){
          var self = $(this);
          // console.log(self.closest("div"));
          // console.log(self.closest("div").find("img").attr("src"));
          var gifFavorite = self.closest("div").find("img").attr("src");

          });



    })
      
