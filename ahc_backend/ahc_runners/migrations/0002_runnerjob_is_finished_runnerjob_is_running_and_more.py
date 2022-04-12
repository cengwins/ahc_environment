# Generated by Django 4.0 on 2022-04-03 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ahc_runners", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="runnerjob",
            name="is_finished",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="runnerjob",
            name="is_running",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="runnerjob",
            name="will_cancel",
            field=models.BooleanField(default=False),
        ),
    ]
