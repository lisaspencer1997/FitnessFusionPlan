import NutriFact from "../components/NutriFact";
import Countdown from '../components/Countdown';
import NextMealWidget from "../components/NextMealWidget";
import NextActivity from "../components/NextActivity";
import ExerciseComponent from "../components/ExerciseComponent"
import { Card } from "@material-tailwind/react";

const Dashboard = () => {
    return (
        // Container grid
        <div className='grid grid-cols-1 gap-2 md:grid md:grid-cols-6 md:gap-4'>

            {/* Widget Next Activity */}
            <Card className='col-span-1 md:col-start-1 md:col-span-2'>
                <NextActivity />
            </Card>

            {/* Widget Next Milestone */}
            <Card className='col-span-1 md:col-start-3 md:col-span-2'>
                <Countdown />
            </Card>

            {/* Widget Next Food */}
            <Card className='col-span-1 md:col-start-5 md:col-span-2'>
                <NextMealWidget />
            </Card>

            {/* Nutri Check Card */}
            <Card className='col-span-1 md:col-start-1 md:col-span-3'>
                <NutriFact />
            </Card>

            <div className='col-span-1 md:col-span-3 md:grid md:grid-rows-subgrid md:gap-4 md:row-span-2'>
                {/* Recipe Feed */}
                <Card>
                    <ExerciseComponent />
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;