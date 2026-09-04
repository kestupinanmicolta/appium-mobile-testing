package runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        plugin = {
                "pretty",
                "json:target/cucumber/cucumber.json"
        },
        features = "src/test/resources/features",
        glue = {"steps"},
        tags = "",
        monochrome = true
)
public class TestRunner {
}
