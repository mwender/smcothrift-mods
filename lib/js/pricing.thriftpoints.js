(function($){
  console.log('Loading pricing for ThriftPoints...');

      $(`#gform_submit_button_${wpvars.formId}`).attr('disabled',true);
      $('#monthly-cost').html('<span id="disabled">$0</span>');

  var package = {
    numModules: 0,
    numLocations: 1,
    numAudiences: 1,
    modules: {
      googleAds: false,
      brightSign: false,
      socialMedia: false,
      emailMarketing: false
    }
  }
  var pricing = {
    modules: {
      googleAds: {
        monthly: 100,
        setup: 200,
        perLocation: false
      },
      brightSign: {
        monthly: 100,
        setup: 150,
        perLocation: true
      },
      socialMedia: {
        monthly: 800,
        setup: 200,
        ads: 50,
        perLocation: false
      },
      emailMarketing: {
        monthly: 800,
        setup: 0
      }
    }
  };

  /**
   * Calculates the price.
   */
  function calculatePrice(){
    console.log(`Calculating price...\nvar package = `, package );

    var starterPack = false;
    if( package.modules.googleAds && package.modules.brightSign && package.modules.socialMedia && ! package.modules.emailMarketing )
      starterPack = true;

    var completeManagement = false;
    if( package.modules.googleAds && package.modules.brightSign && package.modules.socialMedia && package.modules.emailMarketing )
      completeManagement = true;

    var emailMarketingAdditionalAudienceCost = ( completeManagement )? 500 : 800 ;

    var totalPrice = 0;
    for( const [key,value] of Object.entries(package.modules) ){
      if( value ){
        switch(key){
          case 'emailMarketing':
            totalPrice = totalPrice + pricing.modules[key].monthly + ( emailMarketingAdditionalAudienceCost * (package.numAudiences - 1) );
            break;

          default:
            totalPrice = totalPrice + pricing.modules[key].monthly;
        }

      }
    }
    // Starter Pack (Google Ads, BrightSign, Social Media)
    if( starterPack )
      totalPrice = 850;
    // Complete Management (Google Ads, BrightSign, Social Media, Email Marketing)
    if( completeManagement )
      totalPrice = 1500;
    if( completeManagement && ( package.numAudiences > 1 ) )
      totalPrice = totalPrice + ( emailMarketingAdditionalAudienceCost * ( package.numAudiences - 1 ) );

    var formattedTotalPrice = formatMoney(totalPrice,0);
    if( 0 < totalPrice ){
      var setup = 0;
      for( const [key,value] of Object.entries(package.modules) ){
        if( package.modules[key] ){
          switch( key ){
            case 'brightSign':
              setup = setup + (pricing.modules[key].setup * package.numLocations);
              break;

            default:
              setup = setup + pricing.modules[key].setup;
          }
        }
      }
      // Complete Management Setup Fee
      if( starterPack || completeManagement )
        setup = 550;
      if( ( package.numLocations > 2 ) && ( starterPack || completeManagement ) ){
        setup = setup + ( (package.numLocations - 2) * pricing.modules.brightSign.setup )
      }

      setup = formatMoney(setup,0);
    }

    if( 0 < totalPrice ){
      var formattedTotalPriceDisplay = formattedTotalPrice + '<span>/month</span>';
      // Starter Pack (Google Ads, BrightSign, Social Media)
      if( package.modules.googleAds && package.modules.brightSign && package.modules.socialMedia && ! package.modules.emailMarketing )
        formattedTotalPriceDisplay = '<div class="info"><h3>Starter Pack</h3><p>Google Ads + In-Store Digital Display (for 2 stores) + Social Media</p></div>' + formattedTotalPriceDisplay;
      if( package.modules.googleAds && package.modules.brightSign && package.modules.socialMedia && package.modules.emailMarketing )
        formattedTotalPriceDisplay = '<div class="info"><h3>Complete Management</h3><p>Google Ads + In-Store Digital Display (for 2 stores) + Social Media + Email Marketing (1 audience, additonal audiences $500/ea/month)</p></div>' + formattedTotalPriceDisplay;

      $('#monthly-cost').html(formattedTotalPriceDisplay);

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
        $(`#field_${wpvars.formId}_11 div.gfield_description`).html('To Be Billed Separately: One-time setup fee of ' + setup + '.');

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
    if( setup ){
      $('#setup').html('One-time setup fee ' + setup);
    } else {
      $('#setup').html('');
    }

    //console.log('pricing.modules[package.numModules][package.numLocations]', pricing.modules[package.numModules][package.numLocations] );
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
    calculatePrice();
  });

  // Adjust the no. of locations
  $('select#locations').change(function(){
    package.numLocations = parseInt( this.value );
    calculatePrice();
  });
  // Update package.numLocations
  $('form.thriftpoints').on('change', '#locations', function(){
    var numLocations = $(this).val();
    package.numLocations = parseInt( numLocations );
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

  // Show brightSign-locations if checked "BrightSign"
  $('form.thriftpoints').on('change', '#brightSign', function(){
    $('#brightSign-locations').slideToggle()
  });

  // Show emailMarketing-audiences if checked "Email Marketing"
  $('form.thriftpoints').on('change', '#emailMarketing', function(){
    $('#emailMarketing-audiences').slideToggle()
  });

  // Update package.numAudiences
  $('form.thriftpoints').on('change', '#audiences', function(){
    var numAudiences = $(this).val();
    package.numAudiences = parseInt( numAudiences );
    calculatePrice();
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
  })(jQuery);