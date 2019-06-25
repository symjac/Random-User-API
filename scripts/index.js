$(document).ready(function() {

  // API review

  $.ajax({
    url: 'https://randomuser.me/api/?results=20',
    success: function(data) {
      init(data.results)
    }
  });

// capitalize all words in intro text sentence
var $introText = 'Select the desired user countries.';
var $words = $introText.split('');
console.log($words);

// $introText.forEach(function(words) {
//   var wordFirstLetter = (word).charAt(0).toUpperCase();
//   var wordNoFirstLetter = (word).slice(1);
//   var word = wordFirstLetter + wordNoFirstLetter;
// });

// Create a user tile for each user returned by the API
  function init(users) {
    users.forEach(function(user) {
      var $container = $('.users-container');
      var $userTile = $('<div class="user-tile"></div>');
      var $userName = $('<p class="user-name"></p>');

      var firstNameFirstLetter = (user.name.first).charAt(0).toUpperCase();
      var firstNameNoFirstLetter = (user.name.first).slice(1);
      var firstName = firstNameFirstLetter + firstNameNoFirstLetter;

      var lastNameFirstLetter = (user.name.last).charAt(0).toUpperCase();
      var lastNameNoFirstLetter = (user.name.last).slice(1);
      var lastName = lastNameFirstLetter + lastNameNoFirstLetter;

      var fullName = firstName + ' ' + lastName;
      $userName.text(fullName);

      var $userPhoto = $('<img>');
      $userPhoto.attr('src', user.picture.large);

      var location = user.location.city + ', ' + user.location.state  + ', ' + user.nat;
      var $userLocation = $('<p class="user-location"></p>');
      $userLocation.text(location);

      $userTile.append($userPhoto, $userName, $userLocation);
      $container.append($userTile);
    });
  }

// when search button is clicked, create a param for Checked country values
$('#search-form').on('submit', function(event) {
  event.preventDefault();

  var $checked = $('#search-form input:checked');
  var values = [];
  var checkboxNames = [];
  $checked.each(function() {
      var $checkBox = $(this);
      var value = $checkBox.val();
      values.push(value);
      var checkboxName = $checkBox.prop('name');
      checkboxNames.push(checkboxName);
  });
  var param = values.join();

  // create a text list of Checked country names
  var natNames = '';

  if (checkboxNames.length === 1) {
      natNames = checkboxNames[0];
      // console.log(natNames);
  } else if (checkboxNames.length === 2) {
      natNames = checkboxNames.join(' and ');
      // console.log(natNames);
  } else if (checkboxNames.length > 2) {
      natNames = checkboxNames.slice(0, -1).join(', ') + ', and ' + checkboxNames.slice(-1);
  }

  /* if no box is Checked, show intro text;
  else, show text list of Checked country names*/
  if ($('input:checkbox:checked').length > 0) {
    var $searchText = 'You are searching for people from ' + natNames + '.';
    $('.intro-text').addClass('hide');
    $('.search-text').text($searchText).removeClass('hide');
  }
  else {
    $('.intro-text').removeClass('hide');
    $('.search-text').addClass('hide');
  }

  // update the API url call with param that limits to Checked country values
  $.ajax({
    url: 'https://randomuser.me/api/?results=20' + '&nat=' + param,
    success: function(data) {
      init(data.results)
      $('.users-container').find('.user-tile:lt(20)').remove();
      $('input:checkbox:checked').prop('checked', false);
    }
  });

});
});
