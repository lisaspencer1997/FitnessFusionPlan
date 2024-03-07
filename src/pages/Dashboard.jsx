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
        // Container grid
        <div className='grid grid-cols-6 gap-4'>

            {/* Header */}
            <div className='col-start-1 col-span-6'>
                <Header heading='Dashboard' />
            </div>

            {/* Widget Next Activity */}
            <Card className='col-start-1 col-span-2'>
                <Typography variant="h5" color="blue-gray">
                    Widget 1
                </Typography>
            </Card>

            {/* Widget Next Milestone */}
            <Card className='col-start-3 col-span-2'>
                <Countdown />
            </Card>

            {/* Widget Next Food */}
            <Card className='col-start-5 col-span-2'>
                <Typography variant="h5" color="blue-gray">
                    Widget 3
                </Typography>
            </Card>

            {/* Nutri Check Card */}
            <Card className='col-start-1 col-span-3'>
                <Typography variant="h5" color="blue-gray" className="">
                    Nutri Check
                </Typography>
            </Card>

            <div className='col-span-3 grid grid-rows-subgrid gap-4 row-span-2'>
                {/* Recipe Feed */}
                <Card>
                    <Typography variant="h5" color="blue-gray" className="">
                        Nutri Check
                    </Typography>
                </Card>

                {/* Fitness Carousel */}
                <Card className='flex-1'>
                    <FitnessCarousel />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;