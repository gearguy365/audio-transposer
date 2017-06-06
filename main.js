angular.module('myApp',[])
    .controller('myController', function($scope, $http) {
        var audioContext;
        var audioSource;
        var recorder;
        $scope.filename;
        
        function init () {
            debugger;
            $http.get('guiter.wav', {responseType : 'arraybuffer'}).then(function (response) {
                debugger;
                audioContext = new AudioContext();
                audioContext.decodeAudioData(response.data, function (buffer) {
                    debugger;
                    var semiTones = -4;
                    var semiToneRation = Math.pow(2, 1/12);
                    audioSource = audioContext.createBufferSource();
                    audioSource.onended = function (argument) {
                        recorder.stop()
                        createDownloadLink();
                        recorder.clear();
                    }
                    recorder = new Recorder(audioSource);

                    audioSource.buffer = buffer;
                    audioSource.detune.value = semiTones * 100;
                    // audioSource.connect(audioContext.destination);
                });
            });    
        }
        

        $scope.playAudio = function () {
            audioSource.start();
            recorder.record();
        };

        $scope.pauseAudio = function () {
            
        }

        document.getElementById('file').addEventListener('change', function (evt) {
            debugger;
            var file = evt.target.files[0];
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                    '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
                };
            })(file);

            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        }, false);

        function createDownloadLink() {
            recorder && recorder.exportWAV(function(blob) {
                var url = URL.createObjectURL(blob);
                var li = document.createElement('li');
                var au = document.createElement('audio');
                var hf = document.createElement('a');
                
                au.controls = true;
                au.src = url;
                hf.href = url;
                hf.download = new Date().toISOString() + '.wav';
                hf.innerHTML = hf.download;
                li.appendChild(au);
                li.appendChild(hf);
                recordingslist.appendChild(li);
            });
        }

        init();
    });
