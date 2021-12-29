# Generated by Django 3.2.9 on 2021-12-28 19:54

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import re


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ahc_repositories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Simulation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sequence_id', models.PositiveIntegerField()),
                ('commit', models.CharField(max_length=40, validators=[django.core.validators.RegexValidator(regex=re.compile('^[0-9a-zA-Z]{40}$'))])),
                ('reference', models.CharField(max_length=80)),
                ('reference_type', models.CharField(choices=[('T', 'Tag'), ('C', 'Commit'), ('B', 'Branch')], max_length=1)),
                ('created_at', models.DateTimeField(null=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('repository', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ahc_repositories.repository')),
            ],
        ),
        migrations.CreateModel(
            name='SimulationRun',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sequence_id', models.PositiveIntegerField()),
                ('started_at', models.DateTimeField(null=True)),
                ('finished_at', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(null=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('exit_code', models.PositiveIntegerField()),
                ('log_path', models.CharField(max_length=4096)),
                ('simulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ahc_simulations.simulation')),
            ],
        ),
        migrations.CreateModel(
            name='SimulationRunMetric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sequence_id', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField(null=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('type', models.CharField(choices=[('S', 'System'), ('U', 'User')], max_length=1)),
                ('value_float', models.FloatField(null=True)),
                ('value_int', models.IntegerField(null=True)),
                ('simulation_run', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ahc_simulations.simulationrun')),
            ],
        ),
    ]
