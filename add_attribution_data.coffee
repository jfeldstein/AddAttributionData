addAttributionData = (properties) -> 
  # Be ready to parse url parameters:
  getURLParameter = (name) ->
    decodeURIComponent((new RegExp("[?|&]#{name}=([^&;]+?)(&|#|;|$)").exec(location.search)||[null,""])[1].replace(/\+/g, '%20')) || null

  # Helpers for parsing internal vs external referrers:
  getLatestReferrer = (which) ->
    ref = document.referrer
    indexOfDomain = ref.toLowerCase().indexOf(window.location.hostname)
    useCurrentReferrer = ((which == 'internal' && indexOfDomain != -1) || (which == 'external' && indexOfDomain == -1));

    if(useCurrentReferrer)
      return ref || null
    else 
      return $.cookie("latest_#{which}_referrer") || null

  getFirstReferrer = (which, latest) ->
    storedVal = $.cookie('first_'+which+'_referrer')
    if (storedVal != null && storedVal != '') then storedVal else latest

  # Helpers for parsing first and last UTM params
  getLatestUtmCampaign = ->
    getURLParameter('utm_campaign') || $.cookie('latest_utm_campaign') || null

  getFirstUtmCampaign = (latest) ->
    storedVal = $.cookie('first_utm_campaign')
    if (storedVal != null && storedVal != '') then storedVal else latest

  # Juggle latest_referrer into internal and external referrers
  latest_internal_referrer = getLatestReferrer 'internal'
  latest_external_referrer = getLatestReferrer 'external'
  first_internal_referrer = getFirstReferrer 'internal', latest_internal_referrer
  first_external_referrer = getFirstReferrer 'external', latest_external_referrer

  # Update the persisted values
  $.cookie 'first_external_referrer',  first_external_referrer,  {expires: 90}  if first_external_referrer?
  $.cookie 'first_internal_referrer',  first_internal_referrer,  {expires: 90}  if first_internal_referrer?
  $.cookie 'latest_external_referrer', latest_external_referrer, {expires: 90}  if latest_external_referrer?
  $.cookie 'latest_internal_referrer', latest_internal_referrer, {expires: 90}  if latest_internal_referrer?

  # Juggle first and latest utm_campaign values
  latest_utm_campaign = getLatestUtmCampaign()
  first_utm_campaign  = getFirstUtmCampaign(latest_utm_campaign)

  # Update the persisted values (in the cookies)
  $.cookie 'first_utm_campaign', first_utm_campaign, {expires: 90} if first_utm_campaign?
  $.cookie 'latest_utm_campaign', latest_utm_campaign, {expires: 90} if latest_utm_campaign?

  # Winner, winner, chicken dinner!
  attribution_data =
    first_internal_referrer:  first_internal_referrer
    first_external_referrer:  first_external_referrer
    first_utm_campaign:       first_utm_campaign
    latest_internal_referrer: latest_internal_referrer
    latest_external_referrer: latest_external_referrer
    latest_utm_campaign:      latest_utm_campaign

  # Default to empty properties hash
  properties ||= {}

  # Add each of the attribution_data key-pairs to the properties logged with the event
  $.each attribution_data, (key, value) ->
    properties[key] = value if value?
