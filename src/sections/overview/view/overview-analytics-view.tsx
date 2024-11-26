import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import  Box  from '@mui/material/Box';
import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
 
import { AnalyticsConversionRates } from '../analytics-conversion-rates';


// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
            title="Active Users"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon="fa-solid:user"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
            title="Risk Assessments"
            percent={2.6}
            total={714000}
            icon="mage:heart-health-fill"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Self Checks"
            percent={2.8}
            total={1723315}
            color="warning"
            icon="game-icons:self-love"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="PinkConnect Labs"
            percent={3.6}
            total={234}
            color="error"
            icon="ooui:lab-flask"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Risk Levels"
            chart={{
              colors:[
                '#ed2f8c', // Dark Pink - High Risk
                '#FF69B4', // Medium Pink - Moderate Risk
                '#FFB3DE', // Light Pink - Low Risk
              ],
              series: [
                { label: 'High', value: 3500 },
                { label: 'Moderate', value: 2500 },
                { label: 'Low', value: 1500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Monthly Analysis of Risk Levels"
            subheader="Risk Trends by Month"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              colors:[
                '#ed2f8c', // Dark Pink - High Risk
                '#FF69B4', // Medium Pink - Moderate Risk
                '#FFB3DE', // Light Pink - Low Risk
              ],
              series: [
                { name: 'High', data: [43, 33, 22, 37, 67, 68, 37, 24, 55, 63, 5] },
                { name: 'Moderate', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 42, 6] },
                { name: 'Low', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 15, 2] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Monthly New User Growth"
            subheader="(+43%) than last year"
            chart={{
              colors:[
                '#ed2f8c', // Dark Pink - High Risk
              ],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              series: [
                { name: 'New Users', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 42, 6] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
        <AnalyticsTrafficBySite
            title="Sign-Up Channels"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'apple', label: 'Apple', total: 411213 },
              { value: 'in-app', label: 'In-App', total: 443232 },
            ]}
          />
          <Box marginY="2.5vh"/>
           <AnalyticsOrderTimeline title="User Timeline" list={_timeline} />
        </Grid>

       

      </Grid>
    </DashboardContent>
  );
}
