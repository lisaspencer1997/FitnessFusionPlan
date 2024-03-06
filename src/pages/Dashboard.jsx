import WaterCounter from '../components/WaterCounter'
import Playlist from '../components/Playlist'
import NutriCheck from "../components/NutriCheck";
import Header from '../components/Header';
import Countdown from '../components/Countdown';
import FitnessCarousel from '../components/FitnessCarousel';
import {
    Card,
    Typography,
} from "@material-tailwind/react";

const Dashboard = () => {
    return (
        <div className='flex flex-col gap-2 h-full'>
            <Header heading='Dashboard' />
            <div className='w-full flex flex-row gap-2 mt-2 text-center'>
                <Card className='flex-1 flex flex-col content-center'>
                    <Typography variant="h5" color="blue-gray">
                        Widget 1
                    </Typography>
                </Card>
                <Card className='flex-1'>
                    <Countdown />
                </Card>
                
                <Card className='flex-1'>
                    <Typography variant="h5" color="blue-gray">
                        Widget 3
                    </Typography>
                </Card>
            </div>
            <div className='flex flex-row gap-2 h-full'>
                <Card className='flex-1 content-stretch'>
                    <Typography variant="h5" color="blue-gray" className="">
                        Nutri Check
                    </Typography>
                </Card>
                <Card className='flex-1 content-stretch'>
                    <FitnessCarousel />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;