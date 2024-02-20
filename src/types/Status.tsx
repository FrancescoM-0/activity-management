import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

interface IStatus {
  name: string;
  icon: JSX.Element;
}

const Status: { [key: string]: IStatus } = {
  Ongoing: {
    name: "In corso",
    icon: <AccessTimeIcon />,
  },
  Planned: {
    name: "Pianificato",
    icon: <EventIcon />,
  },
  Done: {
    name: "Completato",
    icon: <DoneIcon />,
  },
  Pending: {
    name: "In attesa",
    icon: <HourglassTopIcon />,
  },
};

export default Status;
