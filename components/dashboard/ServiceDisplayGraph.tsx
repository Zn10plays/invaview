import Echarts from 'echarts-for-react';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import Skeleton from "@mui/material/Skeleton";

interface ServiceDisplayGraphProps {
  getData: () => {}
  name: string
  provider: string
  getStatus: () => 'active' | 'maintenance' | 'down' | 'discontinued';
}

export default function ServiceDisplayGraph(props: ServiceDisplayGraphProps) : JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');
  const [option, setOption] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  });

  useEffect(() => {
    const data = props.getData();
    const status = props.getStatus();
    setData(data);
    setStatus('maintenance');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Skeleton height={400}/>
  }

  return <Paper elevation={2} sx={{mt: 1}}>
    <Box sx={{display: 'flex', minHeight: 250}}>
      <Paper sx={{flex: 'initial', p: 1}}>
        <Typography variant={'h6'} noWrap>
          {status === 'active' ? 'Active' : 'Down'}
        </Typography>
        <Divider/>
        <List>
          <ListItemButton>
            <ListItemText primary={'Cool Text'}/>
          </ListItemButton>
        </List>
      </Paper>
      <Box sx={{flex: 'auto', p:1}}>
        <Echarts option={option} />
      </Box>
    </Box>
  </Paper>
}