(function($){

      $(`#gform_submit_button_${wpvars.formId}`).attr('disabled',true);
      $('#monthly-cost').html('<span id="disabled">$0</span>');

      var package = {
        "numModules": 0,
        "numLocations": 0,
        "modules": {
          "module_pos": false,
          "module_donations": false,
          "module_metrics": false
        }
      }
      var pricing = {
        "modules": {
          0: 0,
          1: {
            0: 0.00,
            1: 150.00,
            2: 300.00,
            3: 450.00,
            4: 600.00,
            5: 750.00,
            6: 900.00,
            7: 1050.00,
            8: 1200.00,
            9: 1350.00,
            10: 1500.00
          },
          2: {
            0: 0.00,
            1: 250.00,
            2: 400.00,
            3: 563.00,
            4: 700.00,
            5: 813.00,
            6: 900.00,
            7: 963.00,
            8: 1000.00,
            9: 1125.00,
            10: 1250.00
          },
          3: {
            0: 0.00,
            1: 350.00,
            2: 560.00,
            3: 788.00,
            4: 980.00,
            5: 1138.00,
            6: 1260.00,
            7: 1348.00,
            8: 1400.00,
            9: 1575.00,
            10: 1750.00
          }
        },
        "setup": {
          1: 250.00,
          2: 375.00,
          3: 500.00,
          4: 625.00,
          5: 750.00,
          6: 875.00,
          7: 1000.00,
          8: 1125.00,
          9: 1250.00,
          10: 1375.00
        }
      }

      // Adjust the modules selected
      $('input.module').change(function(){
        package.modules[this.id] = this.checked;
        var countSelectedModules = 0;
        Object.keys(package.modules).forEach(function(key){
          if( true === package.modules[key] )
            countSelectedModules++;
        });
        console.log('countSelectedModules',countSelectedModules);
        package.numModules = countSelectedModules;

        /*
        if( this.checked ){
          package.numModules++;
        } else {
          package.numModules--;
        }
        */
        calculatePrice();
      });

      // Adjust the no. of locations
      $('select#locations').change(function(){
        package.numLocations = parseInt( this.value );
        calculatePrice();
      });

      // Are we discussing the quote or signing up?
      $('input[name="input_7"]').change(function(){
        console.log('Discuss/Sign Up value =', this.value );
        if( 'I\'d like to discuss my quote.' === this.value ){
          $(`#gform_submit_button_${wpvars.formId}`).val('Discuss Your Quote');
        } else {
          $(`#gform_submit_button_${wpvars.formId}`).val('Sign Up');
        }
      });

      /**
       * Returns a number formatted with commas
       *
       * @param      {number}              n       { parameter_description }
       * @param      {(Function|boolean)}  c       { parameter_description }
       * @param      {string}              d       { parameter_description }
       * @param      {string}              t       { parameter_description }
       * @return     {string}              { description_of_the_return_value }
       */
      function formatMoney(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;

        return '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
      };

      /**
       * Calculates the price.
       */
      function calculatePrice(){
        console.log('Calculating price...', package );
        var totalPrice = pricing.modules[package.numModules][package.numLocations];
        var formattedTotalPrice = formatMoney(totalPrice,0);
        if( 0 < totalPrice )
          var setup = formatMoney(pricing.setup[package.numLocations],0);

        if( 0 < totalPrice ){
          $('#monthly-cost').html(formattedTotalPrice + '<span>/month</span>');

          // Update CTA Modules
          var selectedModules = [];
          if( package.modules.module_pos )
            selectedModules.push('Point of Sale');
          if( package.modules.module_donations )
            selectedModules.push('Donations');
          if( package.modules.module_metrics )
            selectedModules.push('Business Metrics');
          $(`#input_${wpvars.formId}_1`).val(selectedModules.join(', '));

          // Update CTA Locations
          $(`#input_${wpvars.formId}_2`).val(package.numLocations);

          // Update CTA Quoted Price
          var quotedPrice = formattedTotalPrice + '/month';
          if( 0 < totalPrice )
            quotedPrice = quotedPrice.concat(' (Setup fee for ' + package.numLocations + ' locations ' + setup + '.)');
          $(`#input_${wpvars.formId}_6`).val(quotedPrice);

          // Update the Setup Fee note under the Monthly Recurring License Fee field
          if( 0 < totalPrice )
            $(`#field_${wpvars.formId}_11 div.gfield_description`).html('To Be Billed Separately: ' + setup + ' one-time setup fee for ' + package.numLocations + ' locations.');

          // Update the Product Total Price (used to set the price for transaction)
          //$('#gform_fields_7 input[name="input_12.2"]').val( formatMoney(totalPrice,2) );
          $(`#gform_fields_${wpvars.formId} input[name="input_12.2"]`).val( formatMoney(totalPrice,2) );
          $(`.ginput_total_${wpvars.formId}`).html( formattedTotalPrice );
          $(`#input_${wpvars.formId}_11`).val( formatMoney(totalPrice,2) );

          // Activate the form submission button
          $(`#gform_submit_button_${wpvars.formId}`).attr('disabled',false);
        } else {
          $('#monthly-cost').html('<span id="disabled">$0</span>');
          $(`#input_${wpvars.formId}_6`).val('');
          $(`#gform_fields_${wpvars.formId} input[name="input_12.2"]`).val( formatMoney(totalPrice,2) );
          $(`.ginput_total_${wpvars.formId}`).html( formattedTotalPrice );
          $(`#input_${wpvars.formId}_11`).val( formatMoney(totalPrice,2) );
          // Deactivate the form submission button
          $(`#gform_submit_button_${wpvars.formId}`).attr('disabled',true);
        }
        if( 0 < totalPrice ){
          $('#setup').html('One-time setup fee for ' + package.numLocations + ' locations: ' + setup);
        } else {
          $('#setup').html('');
        }

        console.log('pricing.modules[package.numModules][package.numLocations]', pricing.modules[package.numModules][package.numLocations] );
      }
  })(jQuery);