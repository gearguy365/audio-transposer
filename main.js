angular.module('myApp',[])
    .controller('myController', function($scope, $http) {
        $scope.playAudio = function () {
            $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1715/the_xx_-_intro.mp3', {responseType : 'arraybuffer'}).then(function (response) {
                debugger;
                var audioContext = new AudioContext();
                audioContext.decodeAudioData(response.data, function (buffer) {
                    debugger;
                    var semiTones = -4;
                    var semiToneRation = Math.pow(2, 1/12);

                    var audioSource = audioContext.createBufferSource();
                    audioSource.buffer = buffer;
                    // audioSource.playbackRate.value = Math.pow(semiToneRation, semiTones);
                    audioSource.detune.value = semiTones * 100;
                    audioSource.connect(audioContext.destination);
                    debugger;
                    audioSource.start();
                });
            });
        };
    });
