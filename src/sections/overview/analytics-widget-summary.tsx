import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  icon: string;
  chart: {
    series: number[];
    categories: string[];
    options?: ChartOptions;
  };
  gradientColors?: [string, string]; // Array for two gradient colors
};

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  gradientColors = ['#FFD1E8', '#FFA6C9'], // Lighter pink gradient by default
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: [gradientColors[0]], // Use the first color in the gradient for chart line
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });

  const renderTrending = (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Iconify width={20} icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'} />
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${gradientColors[0]}, ${gradientColors[1]}`, // Apply the lighter pink gradient
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: theme.palette.text.primary,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3, backgroundColor: 'common.white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Iconify width={24} icon={icon} color="#FF69B4" />
      {/* <Iconify width={24} icon="ooui:lab-flask" color="#FF69B4" /> */}
      {/* <Iconify width={24} icon="game-icons:self-love" color="#FF69B4" /> */}
      {/* <Iconify width={24} icon="fa-solid:user" color="#FF69B4" /> */}
        {/* <Iconify width={24} icon="fluent:person-warning-20-filled" color="#FF69B4" /> */}
      </Box>    

      {renderTrending}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
          <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
        />
      </Box>

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: gradientColors[0], // Use the first color for the background shape
        }}
      />
    </Card>
  );
}
