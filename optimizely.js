(function () {
    'use strict';

    let experimentId = null,
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
        if (window.optimizely.data.state.variationIdsMap.length > 0) {
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
    if (experimentId !== null) {
        clearDomChildren(experimentIdSpan);
        experimentIdSpan.appendChild(document.createTextNode(experimentId));
    }
    if (variationId !== null) {
        clearDomChildren(variationIdSpan);
        variationIdSpan.appendChild(document.createTextNode(variationId));
    }
    if (generatedKey !== null) {
        clearDomChildren(generatedKeySpan);
        generatedKeySpan.appendChild(document.createTextNode(generatedKey));
    }
}());
