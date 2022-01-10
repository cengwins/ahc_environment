# Generated by Django 4.0 on 2022-01-10 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ahc_repositories', '0003_alter_repository_name_alter_repositoryuser_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repository',
            name='upstream_type',
            field=models.CharField(choices=[('GIT', 'Git')], max_length=3),
        ),
        migrations.AlterField(
            model_name='repositoryuser',
            name='type',
            field=models.CharField(choices=[('OWNER', 'Owner'), ('COLLABORATOR', 'Collaborator')], max_length=12),
        ),
    ]
