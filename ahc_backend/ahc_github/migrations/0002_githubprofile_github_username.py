# Generated by Django 4.0 on 2022-03-27 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ahc_github", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="githubprofile",
            name="github_username",
            field=models.CharField(default="adsf", max_length=120),
            preserve_default=False,
        ),
    ]
