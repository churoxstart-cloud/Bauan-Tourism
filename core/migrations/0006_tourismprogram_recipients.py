from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_roomdailylog_is_archived"),
    ]

    operations = [
        migrations.AddField(
            model_name="tourismprogram",
            name="send_to_all",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="tourismprogram",
            name="recipients",
            field=models.ManyToManyField(
                blank=True, related_name="programs_received", to="core.resort"
            ),
        ),
    ]
