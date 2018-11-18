namespace EvoDevoCore.Models
{
    public class Swarm // Community? Colony? Population? Bunch?
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }
        public long SpeciesId { get; set; } //Object?
        public Species Species { get; set; } //Object?
        public long AreaId { get; set; }

        public override string ToString()
        {
            var tostring = "";
            var speciesName = (Species != null) ? Species.Name : "";
            tostring += "{ Id: " + Id + ", Name: " + Name + ", Size: " + Size + ", SpeciesId: " + SpeciesId + ", Species: " + speciesName + ", AreaId: " + AreaId + " }";
            return tostring;
        }
    }
}