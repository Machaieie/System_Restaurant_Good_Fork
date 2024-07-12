import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/joy/Button';
import { ClipLoader } from 'react-spinners';
import { ReservationSchema } from "../../services/SchemaService";
import http from "../../http-common";

const ReservaForm = ({ mode, url, successMessage }) => {
  const [date, setDate] = useState(dayjs(''));
  const [time, setTime] = useState(dayjs(''));
  const [isLoading, setLoading] = useState(false);

  const getSchema = () => {
    switch (mode) {
      case "CREATE":
      case "UPDATE":
      default:
        return ReservationSchema;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(getSchema()), mode: "onBlur" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        date: date.format('YYYY-MM-DD'),
        time: time.format('HH:mm')
      };

      if (mode === "UPDATE") {
        await http.put(url, formattedData);
      } else {
        await http.post(url, formattedData);
      }

      toast.success(successMessage);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao criar reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primeiro Nome"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Último Nome"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefone"
            fullWidth
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Dia"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setValue('date', newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Hora"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                  setValue('time', newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número de Pessoas"
            fullWidth
            type="number"
            {...register('numberPeople')}
            error={!!errors.numberPeople}
            helperText={errors.numberPeople?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observações"
            fullWidth
            multiline
            rows={3}
            {...register('observations')}
            error={!!errors.observations}
            helperText={errors.observations?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            {!isLoading ? (
              <Button type="submit">
                Salvar
              </Button>
            ) : (
              <Button type="submit">
                <ClipLoader color={"#fff"} size={20} />
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservaForm;
