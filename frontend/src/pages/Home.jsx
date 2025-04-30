import HomeCards from "../components/HomeCards";
import TopicStudy from "../TopicStudy";
import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import "../styles/Home.css";
import "react-toastify/dist/ReactToastify.css";

const videoData = [
  {
    id: 1,
    image: "https://img.youtube.com/vi/2Ji-clqUYnA/0.jpg",
    title: "Intro to JavaScript",
    description: "Learn the fundamentals of JavaScript in this beginner-friendly tutorial."
  },
  {
    id: 2,
    image: "https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg",
    title: "React Basics",
    description: "Understand the core concepts of React with this introductory video."
  },
  {
    id: 3,
    image: "https://img.youtube.com/vi/Oe421EPjeBE/0.jpg",
    title: "Python for Beginners",
    description: "Start your Python journey with this beginner-level course."
  },
  {
    id: 4,
    image: "https://img.youtube.com/vi/pKd0Rpw7O48/0.jpg",
    title: "Node.js Crash Course",
    description: "Learn how to build backend APIs with Node.js."
  },
  {
    id: 5,
    image: "https://img.youtube.com/vi/kUMe1FH4CHE/0.jpg",
    title: "HTML & CSS Tutorial",
    description: "Design beautiful web pages using HTML and CSS."
  },
  {
    id: 6,
    image: "https://img.youtube.com/vi/_uQrJ0TkZlc/0.jpg",
    title: "Python Full Course",
    description: "Go from beginner to expert in Python in this full course."
  },
  {
    id: 7,
    image: "https://img.youtube.com/vi/f02mOEt11OQ/0.jpg",
    title: "What is Docker?",
    description: "Understand the basics of Docker and containerization."
  },
  {
    id: 8,
    image: "https://img.youtube.com/vi/aWhUSpBv1U4/0.jpg",
    title: "Git & GitHub",
    description: "Learn version control with Git and collaborate using GitHub."
  },
  {
    id: 9,
    image: "https://img.youtube.com/vi/SrwxAScdyT0/0.jpg",
    title: "System Design Basics",
    description: "Get started with system design for interviews and real projects."
  },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <h2 className="home_hero_heading">Discover Topics</h2>
      <div className="home_card-container">
        {TopicStudy.map((card) => (
          <HomeCards
            key={card.id}
            imgSrc={card.image}
            title={card.topicName}
            description={card.description}
          />
        ))}
      </div>

      <h2 className="home_hero_heading">Explore Tech Videos</h2>
      <div className="home_card-container-2">
        {videoData.map((video) => (
          <VideoCard
            key={video.id}
            image={video.image}
            title={video.title}
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
