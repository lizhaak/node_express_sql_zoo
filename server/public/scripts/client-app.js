$(document).ready(function () {
  getAnimals();

  // add a animal
  $('#animal-submit').on('click', postAnimal);
});

/**
 * Retrieve animals from server and append to DOM
 */
function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log('GET /animals returns:', animals);

      animals.forEach(function (animal) {
        var $el = $('<div></div>');

        var animalProperties = ['animal', 'animal_count'];

        animalProperties.forEach(function (property) {
          var $input = $('<input type="text" id="' + property + '" name="' + property + '" />');
          $input.val(animal[property]);
          $el.append($input);
        });

        $el.data('animalId', animal.id);

        $('#animal-list').append($el);

      });
    },

    error: function (response) {
      console.log('GET /animals fail. No books could be retrieved!');
    },
  });
}

/**
 * Post animals from the client side to the server then send it back to append to DOM
 */

function postAnimal() {
  event.preventDefault();

  var animal = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function () {
      console.log('POST /animals works!');
      $('#animal-list').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /animals does not work...');
    },
  });
}
