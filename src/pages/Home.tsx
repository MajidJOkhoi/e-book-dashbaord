import { PlusCircle, User, Eye, Star, View } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="-flex -flex-col -items-center -min-h-screen -p-8 -space-y-10">
      <div className="-flex -flex-col md:-flex-row -space-y-6 md:-space-y-0 md:-space-x-6">
        <div className="-bg-white -rounded-lg -shadow-xl -p-4 -w-full md:-w-80 -flex -items-center -justify-center">
          <Link to={'/dashboard/projects'}>
          
          <button className="-relative -px-10 -py-4 -rounded-lg -bg-white -isolation-auto -z-10 -border-2 -border-lime-500 before:-absolute before:-w-full before:-transition-all before:-duration-700 before:hover:-w-full before:-left-full before:hover:-left-0 before:-rounded-full before:-bg-lime-500 before:-z-10 before:-aspect-square before:hover:-scale-150 -overflow-hidden before:hover:-duration-700 -flex -items-center -justify-center -text-xl md:-text-2xl -font-semibold">
            <PlusCircle className="-mr-2 -w-6 -h-6 -text-lime-500" />
            <span className="-relative -z-10  group-hover:-text-white">Manage Project</span>
          </button>
          
          </Link>
        </div>
        <div className="-bg-white -rounded-lg -shadow-xl -p-4 -w-full md:-w-80 -flex -items-center -justify-center">
       
          <Link to={'/dashboard/team'}>
          
          <button className="-relative -px-10 -py-4 -rounded-lg -bg-white -isolation-auto -z-10 -border-2 -border-blue-500 before:-absolute before:-w-full before:-transition-all before:-duration-700 before:hover:-w-full before:-left-full before:hover:-left-0 before:-rounded-full before:-bg-blue-500 before:-z-10 before:-aspect-square before:hover:-scale-150 -overflow-hidden before:hover:-duration-700 -flex -items-center -justify-center -text-xl md:-text-2xl -font-semibold">
            <User className="-mr-2 -w-6 -h-6 -text-blue-500" />
            <span className="-relative  -z-10 group-hover:-text-white">Manage User</span>
          </button>


          </Link>
        </div>
      </div>
      <div className="-flex -flex-col md:-flex-row -space-y-6 md:-space-y-0 md:-space-x-6">
        <div className="-bg-white -rounded-lg -shadow-xl -p-4 -w-full md:-w-80 -flex -items-center -justify-center">
        
        <Link to={'/dashboard/leaves'}>
    
          <button className="-relative -px-10 -py-4 -rounded-lg -bg-white -isolation-auto -z-10 -border-2 -border-teal-500 before:-absolute before:-w-full before:-transition-all before:-duration-700 before:hover:-w-full before:-left-full before:hover:-left-0 before:-rounded-full before:-bg-teal-500 before:-z-10 before:-aspect-square before:hover:-scale-150 -overflow-hidden before:hover:-duration-700 -flex -items-center -justify-center -text-xl md:-text-2xl -font-semibold">
            <Eye className="-mr-2 -w-6 -h-6 -text-teal-500" />
            <span className="-relative  -z-10 group-hover:-text-white">View Leave</span>
          </button>
        
        </Link>
        </div>
        <div className="-bg-white -rounded-lg -shadow-xl -p-4 -w-full md:-w-80 -flex -items-center -justify-center">
         
         <Link to={'/dashboard/performance'}>
         
          <button className="-relative -px-10 -py-4 -rounded-lg -bg-white -isolation-auto -z-10 -border-2 -border-purple-500 before:-absolute before:-w-full before:-transition-all before:-duration-700 before:hover:-w-full before:-left-full before:hover:-left-0 before:-rounded-full before:-bg-purple-500 before:-z-10 before:-aspect-square before:hover:-scale-150 -overflow-hidden before:hover:-duration-700 -flex -items-center -justify-center -text-xl md:-text-2xl -font-semibold">
            <Star className="-mr-2 -w-6 -h-6 -text-purple-500" />
            <span className="-relative -z-10 group-hover:-text-white">Performance</span>
          </button>
         </Link>

         
        </div>


        
      </div>

      <div className="-flex -flex-col md:-flex-row -space-y-6 md:-space-y-0 md:-space-x-6">
        <div className="-bg-white -rounded-lg -shadow-xl -p-4 -w-full md:-w-80 -flex -items-center -justify-center">
        
        <Link to={'/dashboard/attendence'}>
    
          <button className="-relative -px-10 -py-4 -rounded-lg -bg-white -isolation-auto -z-10 -border-2 -border-teal-500 before:-absolute before:-w-full before:-transition-all before:-duration-700 before:hover:-w-full before:-left-full before:hover:-left-0 before:-rounded-full before:-bg-cyan-500 before:-z-10 before:-aspect-square before:hover:-scale-150 -overflow-hidden before:hover:-duration-700 -flex -items-center -justify-center -text-xl md:-text-2xl -font-semibold">
            <View className="-mr-2 -w-6 -h-6 -text-teal-500" />
            <span className="-relative  -z-10 group-hover:-text-white"> view Attendece </span>
          </button>
        
        </Link>
        </div>
   

        
      </div>
    </div>
  );
};

export default Home;
