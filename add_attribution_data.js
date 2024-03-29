// Generated by CoffeeScript 1.3.3
(function() {
  var addAttributionData;

  addAttributionData = function(properties) {
    var attribution_data, first_external_referrer, first_internal_referrer, first_utm_campaign, getFirstReferrer, getFirstUtmCampaign, getLatestReferrer, getLatestUtmCampaign, getURLParameter, latest_external_referrer, latest_internal_referrer, latest_utm_campaign;
    getURLParameter = function(name) {
      return decodeURIComponent((new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, '%20')) || null;
    };
    getLatestReferrer = function(which) {
      var indexOfDomain, ref, useCurrentReferrer;
      ref = document.referrer;
      indexOfDomain = ref.toLowerCase().indexOf(window.location.hostname);
      useCurrentReferrer = (which === 'internal' && indexOfDomain !== -1) || (which === 'external' && indexOfDomain === -1);
      if (useCurrentReferrer) {
        return ref || null;
      } else {
        return $.cookie("latest_" + which + "_referrer") || null;
      }
    };
    getFirstReferrer = function(which, latest) {
      var storedVal;
      storedVal = $.cookie('first_' + which + '_referrer');
      if (storedVal !== null && storedVal !== '') {
        return storedVal;
      } else {
        return latest;
      }
    };
    getLatestUtmCampaign = function() {
      return getURLParameter('utm_campaign') || $.cookie('latest_utm_campaign') || null;
    };
    getFirstUtmCampaign = function(latest) {
      var storedVal;
      storedVal = $.cookie('first_utm_campaign');
      if (storedVal !== null && storedVal !== '') {
        return storedVal;
      } else {
        return latest;
      }
    };
    latest_internal_referrer = getLatestReferrer('internal');
    latest_external_referrer = getLatestReferrer('external');
    first_internal_referrer = getFirstReferrer('internal', latest_internal_referrer);
    first_external_referrer = getFirstReferrer('external', latest_external_referrer);
    if (first_external_referrer != null) {
      $.cookie('first_external_referrer', first_external_referrer, {
        expires: 90
      });
    }
    if (first_internal_referrer != null) {
      $.cookie('first_internal_referrer', first_internal_referrer, {
        expires: 90
      });
    }
    if (latest_external_referrer != null) {
      $.cookie('latest_external_referrer', latest_external_referrer, {
        expires: 90
      });
    }
    if (latest_internal_referrer != null) {
      $.cookie('latest_internal_referrer', latest_internal_referrer, {
        expires: 90
      });
    }
    latest_utm_campaign = getLatestUtmCampaign();
    first_utm_campaign = getFirstUtmCampaign(latest_utm_campaign);
    if (first_utm_campaign != null) {
      $.cookie('first_utm_campaign', first_utm_campaign, {
        expires: 90
      });
    }
    if (latest_utm_campaign != null) {
      $.cookie('latest_utm_campaign', latest_utm_campaign, {
        expires: 90
      });
    }
    attribution_data = {
      first_internal_referrer: first_internal_referrer,
      first_external_referrer: first_external_referrer,
      first_utm_campaign: first_utm_campaign,
      latest_internal_referrer: latest_internal_referrer,
      latest_external_referrer: latest_external_referrer,
      latest_utm_campaign: latest_utm_campaign
    };
    properties || (properties = {});
    return $.each(attribution_data, function(key, value) {
      if (value != null) {
        return properties[key] = value;
      }
    });
  };

}).call(this);
