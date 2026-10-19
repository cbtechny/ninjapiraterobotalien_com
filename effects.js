
    (function () {
      var root = document.documentElement;
      var forcedMode = null;

      try {
        var params = new URLSearchParams(window.location.search);
        var requestedMode = params.get('effects');

        if (requestedMode === 'lite' || requestedMode === 'full') {
          window.localStorage.setItem('site-effects-mode', requestedMode);
          forcedMode = requestedMode;
        } else if (requestedMode === 'auto') {
          window.localStorage.removeItem('site-effects-mode');
        } else {
          forcedMode = window.localStorage.getItem('site-effects-mode');
        }
      } catch (error) {
        forcedMode = null;
      }

      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (forcedMode === 'lite' || (forcedMode !== 'full' && connection && connection.saveData)) {
        root.classList.add('effects-lite');
      }
    })();
