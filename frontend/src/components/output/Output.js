import React, { useRef, useEffect } from 'react';
import './Output.css';
import play from '../../assets/svg/play.svg';
import volumeOn from '../../assets/svg/volume-on.svg';
import volumeOff from '../../assets/png/volume-off.png';
import pause from '../../assets/png/pause.png';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/src/plugin/spectrogram';
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';
const Output = ({ title, data }) => {
    const [isPlaying, setPlaying] = React.useState(false);
    const [isVolumeOff, setVolumeOff] = React.useState(false);
    const [wave, setWave] = React.useState();
    const [duration, setDuration] = React.useState('00:00');
    const [current, setCurrent] = React.useState('00:00');
    const [progress, setProgress] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const waveFormRef = useRef();
    const waveSpecRef = useRef();
    const waveTimeLineRef = useRef();
    let wavesurfer = wave;
    useEffect(() => {
        WaveSurfer.util
            .fetchFile({ url: 'hot-colormap.json', responseType: 'json' })
            .on('success', (colorMap) => {
                wavesurfer?.destroy();
                wavesurfer = WaveSurfer.create({
                    container: waveFormRef.current,
                    waveColor: '#1f77b4',
                    progressColor: '#74a9d4',
                    backgroundColor: 'white',
                    responsive: true,
                    hideScrollbar: true,
                    plugins: [
                        SpectrogramPlugin.create({
                            wavesurfer: wavesurfer,
                            container: waveSpecRef.current,
                            labels: true,
                            colorMap: colorMap,
                            frequencyMax: 8000,
                            responsive: true,
                            height: 256,
                        }),
                        TimelinePlugin.create({
                            wavesurfer: wavesurfer,
                            container: waveTimeLineRef.current,
                        })
                    ],

                });
                wavesurfer.load(data);
                wavesurfer.on('ready', function () {
                    setTotal(wavesurfer.getDuration());
                    setDuration(new Date(wavesurfer.getDuration() * 1000).toISOString().slice(14, 19));
                });

                wavesurfer.on('audioprocess', function () {
                    setProgress(wavesurfer.getCurrentTime());
                    setCurrent(new Date(wavesurfer.getCurrentTime() * 1000).toISOString().slice(14, 19));
                });
                setWave(wavesurfer);
                setPlaying(false);
                setVolumeOff(false);
            });

    }, [data]);

    const onClickPlayBtn = () => {
        wavesurfer.playPause();
        setPlaying(!isPlaying);
    }

    const onClickVolumeBtn = () => {
        wavesurfer.toggleMute();
        setVolumeOff(!isVolumeOff);
    }

    return (
        <div className='p-2'>
            <div>
                <span className='text-base font-medium'>{title}</span>
            </div>
            <div className='pt-2 w-52'>
                <div className=' flex flex-wrap justify-between bg-gray-100 py-2 px-3 w-52 rounded-full'>
                    <button className='hover:opacity-75' onClick={onClickPlayBtn}>
                        {!isPlaying ? <img className='pr-1' src={play} alt='play'></img> : <img className='pr-1 w-5' src={pause} alt='pause'></img>}
                    </button>
                    <span className='text-xs px-1'>{current}/{duration}</span>
                    <input type='range' max={total} value={progress} className='w-16 h-1 mt-[5px]' readOnly />
                    <button className='hover:opacity-75' onClick={onClickVolumeBtn}>
                        {!isVolumeOff ? <img className='pr-1 h-4' src={volumeOn} alt='volumeOn'></img> : <img className='pr-1 w-5' src={volumeOff} alt='volumeOff'></img>}
                    </button>
                </div>
            </div>
            <div className='pt-4 w-11/12 h-36 loading' ref={waveFormRef}>
            </div>
            <div className='pt-4 w-11/12 h-64 loading' ref={waveSpecRef}>
            </div>
            <div className='pt-4 w-11/12 h-12' ref={waveTimeLineRef}>
            </div>
        </div>
    )
}

export default Output;