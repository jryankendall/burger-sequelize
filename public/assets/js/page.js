$(function() {
    $("body").on("click", ".devour-button", function(event) {
        console.log("button clicked");
        event.preventDefault();
        var burgerId = $(this).data("id");
        var newDevour = $(this).data("devour");

        var newDevourState = {
            devoured: newDevour
        };

        //Ajax PUT call to update devoured status
        $.ajax("/api/devour/" + burgerId, {
            type: "PUT",
            data: newDevourState
        }
        ).then(function(data) {
            location.reload();
        });
});

    $("#add-burger-btn").on("click", function(event) {
        event.preventDefault();
        console.log("Add clicked.");
        var invalidChars = /[^a-z\s]/gi
        if ($("#burger-name-input").val().trim() == "" || invalidChars.test($("#burger-name-input").val().trim())) {
            console.log("Invalid characters input in Add-Burger input.");
            return null;            
        } else
        {
            var inputBurger = $("#burger-name-input").val().toString().trim();
            var burgerObject = {
                name: inputBurger,
                devoured: false
            };
            
            
           $.ajax({
               url: "/api/add/",
               data: burgerObject,
               type: "POST"
           }).then(function(dat) {
               console.log(dat);
               location.reload();
               
           })
        };

    });
    
}
);