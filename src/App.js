import './App.css';
import MusicPlayer from "./components/MusicPlayer";
import ThreeAnimation from "./components/ThreeAnimation"

export default function App() {
      return (
            <div className="App">
                <ThreeAnimation />
                <MusicPlayer />
            </div>
      );
}