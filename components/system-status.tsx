import { 
    CheckCircle2, 
    CircleMinus, 
    Flag, 
    TriangleAlert, 
    Wrench 
} from "lucide-react";

interface System {
    name: string;
    status: 
        | 'No Issues' 
        | 'Maintenance'
        | 'Notice'
        | 'Incident'
        | 'Outage';
    message?: string;
    icon: React.ReactNode;
}

const systems: System[] = [
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <CheckCircle2 size={24} className="text-green-500"/>
    },
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <Wrench size={24} className="text-blue-500"/>
    },
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <Flag size={24} className="text-purple-500"/>
    },
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <TriangleAlert size={24} className="text-yellow-500"/>
    },
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <CircleMinus size={24} className="text-red-500"/>
    },
    {
        name: 'Service Name',
        status: 'No Issues',
        message: 'No issues',
        icon: <CheckCircle2 size={24} className="text-green-500"/>
    }
]
export const SystemStatus = () => {
    return ( 
        <div>
            <div className="flex flex-col w-full justify-center items-center pb-10">
                <CheckCircle2 size={64} className="text-green-500"/>
                <h3>Ben is up and running.</h3>
            </div>
            <div className="flex w-full flex-wrap justify-between bg-foreground-muted border-x border-t custom-border-color rounded-t-sm p-4">
                <div>Current Status by Service</div>
                <div>Legend</div>
            </div>
            <div className="flex w-full flex-wrap border-t border-l custom-border-color">
                {systems.map((system, index) => (
                    <div key={index} className="flex w-1/2 justify-between items-center border-r border-b custom-border-color p-4">
                        <div className="flex flex-col">
                            <p>{system.name}</p>
                            <p className="text-sm">{system.message}</p>
                        </div>
                        {system.icon}
                    </div>
                ))}
            </div>
        </div>
    );
}