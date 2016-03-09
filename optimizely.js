(function () {
    'use strict';

    var AMPLITUDE_KEY = 'e330a213018d4d7bd0dbd47d58a6bfba',

        experimentId = null,
        variationId = null,
        generatedKey = null,

        experimentIdSpan = document.getElementById('experiment-id'),
        variationIdSpan = document.getElementById('variation-id'),
        generatedKeySpan = document.getElementById('generated-key'),

        amplitudeUserIdentify = null,
        amplitudeEventProperties = {};

    function clearDomChildren(domElement) {
        while (domElement.hasChildNodes()) {
            domElement.removeChild(domElement.firstChild);
        }
    }

    // Get experiment ID.
    if (window.optimizely !== undefined) {
        if (window.optimizely.data.state.activeExperiments.length > 0) {
            experimentId = window.optimizely.data.state.activeExperiments[0];
        }
    }

    // Get variation ID.
    if (experimentId !== null) {
        if (window.optimizely.data.state.variationIdsMap[experimentId] !== undefined) {
            variationId = window.optimizely.data.state.variationIdsMap[experimentId];
        }
    }

    // Generate a key.
    if ((experimentId !== null) && (variationId !== null)) {
        generatedKey = [
            'Optimizely',
            window.location.pathname,
            experimentId
        ].join('-');
    }

    // Reporting.
    clearDomChildren(experimentIdSpan);
    clearDomChildren(variationIdSpan);
    clearDomChildren(generatedKeySpan);
    if (experimentId !== null) {
        experimentIdSpan.appendChild(document.createTextNode(experimentId));
    } else {
        experimentIdSpan.appendChild(document.createTextNode('(UNKNOWN)'));
    }
    if (variationId !== null) {
        variationIdSpan.appendChild(document.createTextNode(variationId));
    } else {
        variationIdSpan.appendChild(document.createTextNode('(UNKNOWN)'));
    }
    if (generatedKey !== null) {
        generatedKeySpan.appendChild(document.createTextNode(generatedKey));
    } else {
        generatedKeySpan.appendChild(document.createTextNode('(UNKNOWN)'));
    }

    // Send Optimizely data to Amplitude if an experiment is running.
    if ((experimentId !== null) && (variationId !== null)) {
        amplitude.init(AMPLITUDE_KEY);
        amplitude.setUserId('TEST-USER');
        amplitudeUserIdentify = new amplitude.Identify()
            .set(generatedKey, variationId);
        amplitude.identify(amplitudeUserIdentify);
        amplitudeEventProperties[generatedKey] = variationId;
        amplitude.logEvent(
            'TEST-OPTIMIZELY-AMPLITUDE',
            amplitudeEventProperties
        );
    }
}());
