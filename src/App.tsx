import React, { useEffect, useState } from 'react';
import { Controller, DefaultValues, Resolver, useForm } from 'react-hook-form';

import { useGetPositionsQuery, useGetRelationsQuery } from '../graphql/generated/graphql';
import { useStyles } from './AppStyles';
import { InputAutocomplete } from './components/InputAutocomplete/InputAutocomplete';
import { InputMultiplySelect } from './components/InputMultiplySelect/InputMultiplySelect';
import { InputText } from './components/InputText/InputText';
import { InputTextArea } from './components/InputTextArea/InputTextArea';

export type FormValues = {
  relation: { name: string; id: string };
  position: { name: ''; id: string }[];
  textFieldValue: string;
  textAreaValue: string;
};

export type RelationType = { id?: string; name: string; inputValue?: string };
export type PositionType = RelationType;

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.textFieldValue ? {} : values,
    errors:
      !values.textFieldValue || !values.relation.name || !values.position.length
        ? {
            textFieldValue: {
              type: 'required',
              message: 'This is required.',
            },
            relation: {
              type: 'required',
              message: 'This is required.',
            },
            position: {
              type: 'required',
              message: 'This is required.',
            },
          }
        : {},
  };
};

export const defaultValues: DefaultValues<FormValues> = {
  relation: { name: '', id: '' },
  position: [],
  textFieldValue: '',
  textAreaValue: '',
};

export const App = () => {
  const { classes } = useStyles();
  const { data: dataRelations, loading: isRelationsLoading } = useGetRelationsQuery();
  const { data: dataPositions, loading: isPositionsLoading } = useGetPositionsQuery();

  const [relations, setRelations] = useState<RelationType[]>([]);
  const [positions, setPositions] = useState<PositionType[]>([]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, resolver });

  const onSubmit = handleSubmit((data: FormValues) => alert(JSON.stringify(data)));

  useEffect(() => {
    if (!isRelationsLoading) {
      const data = (
        dataRelations?.applicantIndividualCompanyRelations
          ?.data as unknown as RelationType[]
      ).map((item) => ({
        name: item.name,
        id: item.id,
      }));
      data && setRelations(data);
    }
  }, [dataRelations]);

  useEffect(() => {
    if (!isPositionsLoading) {
      const data = dataPositions?.applicantIndividualCompanyPositions
        ?.data as unknown as PositionType[];
      data && setPositions(data);
    }
  }, [dataPositions]);

  const handleResetClick = () => {
    reset(defaultValues);
  };

  return (
    <div className={classes.app}>
      <div className={classes.formWrapper}>
        <form onSubmit={onSubmit} className={classes.form}>
          <div className={classes.fieldWrapper}>
            <label>MUI TextField</label>
            <Controller
              render={({ field }) => (
                <InputText
                  fieldError={errors.textFieldValue}
                  placeholder={'text field'}
                  value={field.value}
                  onChangeValue={field.onChange}
                />
              )}
              name="textFieldValue"
              control={control}
            />
          </div>

          <div className={classes.fieldWrapper}>
            <label>MUI TextArea</label>
            <Controller
              render={({ field }) => (
                <InputTextArea value={field.value} onChangeValue={field.onChange} />
              )}
              name="textAreaValue"
              control={control}
            />
          </div>

          <div className={classes.fieldWrapper}>
            <label>MUI autocomplete</label>
            <Controller
              render={({ field }) => (
                <InputAutocomplete
                  placeholder={'relations'}
                  fieldError={errors.relation}
                  onChangeValue={field.onChange}
                  options={relations}
                  onReset={handleResetClick}
                />
              )}
              name="relation"
              control={control}
            />
          </div>

          <div className={classes.fieldWrapper}>
            <label>MUI Autocomplete multiply</label>
            <Controller
              render={({ field }) => (
                <InputMultiplySelect
                  placeholder={'position'}
                  fieldError={errors.position}
                  options={positions}
                  onChangeValue={field.onChange}
                  onReset={handleResetClick}
                />
              )}
              name="position"
              control={control}
            />
          </div>

          <button type="button" onClick={handleResetClick}>
            Reset Form
          </button>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
