import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import colorConfigs from '../../configs/ColorConfig'
const RestaurantCard = ({ title, content, circularValue, icon: Icon, color }) => {
    return (
        <Card variant="solid" sx={{ width: 270, backgroundColor: color || colorConfigs.sidebar.bg, height: 100 }} invertedColors>
            <CardContent orientation="horizontal">
                <CircularProgress size="lg" determinate value={circularValue}>
                    {Icon && (
                        <Icon sx={{ color: 'inherit' }} />
                    )}
                </CircularProgress>
                <CardContent>
                    <Typography level="body-md">{title}</Typography>
                    <Typography level="h2">{content}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
};


export default RestaurantCard;