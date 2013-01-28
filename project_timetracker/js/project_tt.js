/*
 * @file
 * JavaScript for ajax_example.
 *
 * See @link ajax_example_dependent_dropdown_degrades @endlink for
 * details on what this file does. It is not used in any other example.
 */

(function($) {

  // Re-enable form elements that are disabled for non-ajax situations.
  Drupal.behaviors.projectTt = {
    attach: function() {
      //Submit Button
      function pushBackMessage( data ) {
        console.log(data);
        //Reset the counter
        $('input[name=tt_time]').val(0);
        $('input[name=tt_submit]').removeAttr('disabled').attr('value', 'Ready for more...');
      }
      
      jQuery('input[name=tt_submit]').click(
        function(event) {
          event.preventDefault();
          $(this).attr('disabled', 'disabled').attr('value', 'Thinking...');
          var formData = jQuery('.project-tt-form form').serialize();
          //submit time to the system
          $.ajax(
            {
              type: "POST",
              url: 'http://local.d8.com/system/timetracker/v1/addtime',
              data: formData,
              success: pushBackMessage
            }
          );
        }
      );
    
    /**
     * Get times of task
     */
    jQuery('select[name=tt_tasks]').change(
      function(){
      var selectedTask = jQuery('option:selected', this).val();
      //Now get the new items related to that selected task
      $.ajax(
        {
          type: "POST",
          url: 'http://local.d8.com/system/timetracker/v1/getTimes',
          data: 
          success: returnTimes
        }
      );
      
      }
    );
    
    function returnTimes(data) {
      console.log(data);
    }
    
    }
  };

})(jQuery);
