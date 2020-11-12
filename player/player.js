class Player {

    constructor (port) {
        this.ytdl = require('ytdl-core');
        this.ffmpeg = require('fluent-ffmpeg');
        this.ffmpegPath = require('@ffmpeg-installer/ffmpeg')
        this.fs = require('fs');
        this.state = false;
        
        this.port = port;
        this.stramConfig = {
            url: `http://localhost:${port}/`,
            sourceuser: "source",
            format: "MP3",
            sourcepassword: "hackme",
        }
        this.addSong("QTvSj68OSuw");
    }

    startPla() {
        this.liveStream.addSong("../songs/keepalive.mp3", function() {
            this.liveSteam.startStream();
        });
    }

    addSong(id) {
        let url = `https://www.youtube.com/watch?v=${id}`;
        let stream = this.ytdl(url);
        console.log ("Iniciando descraga");
        var proc = new this.ffmpeg({source: stream});
        proc.setFfmpegPath(this.ffmpegPath);
        proc.withAudioCodec('libnp3lame')
            .toFormat('mp3')
            .output(this.fs.createWriteStream(`../songs/${id},mp3`))
            .run()
        proc.on('end', function() {
            console.log("Descarga completada");
            let basepl = `#EXTM3U\n../songs/${id}.mp3`;
            this.fs.writeFile("playlist.m3u", `../songs/${id}.mp3\n`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}

module.exports = Player;