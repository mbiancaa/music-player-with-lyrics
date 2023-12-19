import './App.css';
import MusicPlayer from "./components/MusicPlayer";
import ThreeAnimation from "./components/ThreeAnimation"
import InfoButton from "./components/InfoButton";

export default function App() {
      return (
            <div className="App">
                <ThreeAnimation />
                <MusicPlayer />
                <InfoButton />
            </div>
      );
}