<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeRepositoryService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository-service {name}';

    protected $description = 'Create a repository and service for a given model';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');

        // Create Repository
        $this->createRepository($name);

        // Create Service
        $this->createService($name);
        $this->info("Repository and Service created successfully for {$name}");
    }

    protected function createRepository($name)
    {
        $repositoryPath = app_path("Repositories/{$name}Repository.php");

        // Check if the repository file already exists
        if (File::exists($repositoryPath)) {
            $this->warn("Repository {$name}Repository already exists.");

            return;
        }

        // Define the template for the repository
        $repositoryTemplate = <<<EOT
<?php

namespace App\Repositories;

use App\Models\\{$name};

class {$name}Repository
{
    protected \${$name};

    public function __construct({$name} \${$name})
    {
        \$this->{$name} = \${$name};
    }

    // Example method
    public function all()
    {
        return \$this->{$name}->all();
    }
}
EOT;

        // Create the repository file
        File::ensureDirectoryExists(app_path('Repositories'));
        File::put($repositoryPath, $repositoryTemplate);
        $this->info("Created {$name}Repository");
    }

    protected function createService($name)
    {
        $servicePath = app_path("Services/{$name}Service.php");

        // Check if the service file already exists
        if (File::exists($servicePath)) {
            $this->warn("Service {$name}Service already exists.");

            return;
        }

        // Define the template for the service
        $serviceTemplate = <<<EOT
<?php

namespace App\Services;

use App\Repositories\\{$name}Repository;

class {$name}Service
{
    protected \${$name}Repository;

    public function __construct({$name}Repository \${$name}Repository)
    {
        \$this->{$name}Repository = \${$name}Repository;
    }

    // Example method
    public function getAll()
    {
        return \$this->{$name}Repository->all();
    }
}
EOT;

        // Create the service file
        File::ensureDirectoryExists(app_path('Services'));
        File::put($servicePath, $serviceTemplate);
        $this->info("Created {$name}Service");
    }
}
