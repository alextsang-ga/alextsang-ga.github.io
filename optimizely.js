(function () {
    'use strict';

    var experimentId = null,
        variationId = null,
        generatedKey = null,

        experimentIdSpan = document.getElementById('experiment-id'),
        variationIdSpan = document.getElementById('variation-id'),
        generatedKeySpan = document.getElementById('generated-key');

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
}());
