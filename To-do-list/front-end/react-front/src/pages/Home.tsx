import AddTaskForm from "../components/tasks/AddTaskForm";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import React from "react";
import TaskList from "../components/tasks/TaskList";

const Home: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "#212832", minHeight: "800px" }}
    >
      <Header />
      <main className="flex-grow p-4 flex flex-col items-center justify-start">
        <AddTaskForm />
        <TaskList />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
