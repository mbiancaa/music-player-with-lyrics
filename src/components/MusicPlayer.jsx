import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Song from '../assets/audio/underflow.mp3';
import Lyrics from '../assets/audio/lyrics/mappedLyrics';

export default function MusicPlayer() {

    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [lyrics, setLyrics] = useState('');

    const displayLyrics = (progress) => {
        setLyrics(getLyrics(progress.playedSeconds));
    };

    const getLyrics = (playedSeconds) => {
        const currentInterval = Lyrics.find((interval) => playedSeconds >= interval.start && playedSeconds < interval.end);
        return currentInterval ? currentInterval.text : '';
    };

    const replaySong = () => {
        playerRef.current.seekTo(0);
        setIsPlaying(true);
    }

    return (
        <div className="LyricsContainer">
            <div className="LyricsText">
                {lyrics}
            </div>
            <div className="MusicPlayerContainer">
                <ReactPlayer
                    ref={playerRef}
                    url={Song}
                    playing={isPlaying}
                    controls={true}
                    width="400px"
                    height="50px"
                    muted={false}
                    onProgress={displayLyrics}
                    onEnded={replaySong}
                />
            </div>
        </div>
    );

};
