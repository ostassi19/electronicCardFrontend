import MaintenanceList from "./modules/maintenance/components/maintenance-list";
import SupervisedMachineList from "./modules/supervisedMachine/components/supervised-machine-list";
import ProductivityList from "./modules/productivity/components/productivity-list";
import WorkPlanificationList from "./modules/workPlanification/components/work-planification-list";
import AlerteList from "./modules/alerte/components/alerte-list";


var routes = [
    {
        path: "",
        name: "Liste des maintenances",
        icon: "ni ni-bullet-list-67 text-red",
        component: MaintenanceList,
        layout: "/maintenances",
    },
    {
        path: "",
        name: "Liste des machines à superviser",
        icon: "ni ni-bullet-list-67 text-red",
        component: SupervisedMachineList,
        layout: "/supervisedMachine",
    },
    {
        path: "",
        name: "Liste des productivités",
        icon: "ni ni-bullet-list-67 text-red",
        component: ProductivityList,
        layout: "/productivity",
    },
    {
        path: "",
        name: "Liste des plans de travail",
        icon: "ni ni-bullet-list-67 text-red",
        component: WorkPlanificationList,
        layout: "/workPlanification",
    },
    {
        path: "",
        name: "Liste des alertes",
        icon: "ni ni-bullet-list-67 text-red",
        component: AlerteList,
        layout: "/alert",
    },
];
export default routes;
