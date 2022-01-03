# Generated by Django 4.0 on 2022-01-03 22:10

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('ahc_repositories', '0002_alter_repository_created_at_alter_repository_name_and_more'),
        ('ahc_simulations', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='simulationrunmetric',
            name='sequence_id',
        ),
        migrations.AddField(
            model_name='simulationrunmetric',
            name='name',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulation',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulation',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='simulations', to='ahc_repositories.repository'),
        ),
        migrations.AlterField(
            model_name='simulation',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='exit_code',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='finished_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='log_path',
            field=models.CharField(blank=True, max_length=4096, null=True),
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='simulation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='runs', to='ahc_simulations.simulation'),
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='started_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='simulationrun',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulationrunmetric',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulationrunmetric',
            name='simulation_run',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='metrics', to='ahc_simulations.simulationrun'),
        ),
        migrations.AlterField(
            model_name='simulationrunmetric',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='simulationrunmetric',
            name='value_float',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='simulationrunmetric',
            name='value_int',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
