import type { CardProps } from '@mui/material/Card';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';
import Box   from '@mui/material/Box';
import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';


// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    type: string;
    title: string;
  }[];
};

export function AnalyticsOrderTimeline({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props['list'][number];
};

function Item({ item, lastItem, ...other }: ItemProps) {
  const color = 
    item.type === 'order1' ? '#ed2f8c' : // Dark Pink - High Risk
    item.type === 'order2' ? '#FF69B4' : // Medium Pink - Moderate Risk
    item.type === 'order3' ? '#FFB3DE' : // Light Pink - Low Risk
    '#FFDDDD'; // Default to Light Pink if no match

  const count = 10; // Hardcoded count for now

  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: color,
          }}
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2">{item.title}</Typography>
          <Typography variant="subtitle2">{count}</Typography>
         
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
}
