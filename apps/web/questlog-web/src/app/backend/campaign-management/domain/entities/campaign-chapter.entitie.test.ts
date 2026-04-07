import { describe, it, expect, test } from 'vitest'
import { CampaignChapter } from './campaign-chapter.entitie'
import { Guid } from '../../../shared-kernel/guid.value-object'

describe('StructureNodeModel.constructor', () => {
  it('creates a structure node with the correct ID', () => {
    // Arrange 
    //var newGuid = Guid.newGuid();
    //const node = new CampaignChapter(newGuid, 'Test Node')
    // Assert
    //expect(node.Id).toBe(newGuid)
  })

  it('creates a structure node with the correct name', () => {
    // Arrange
    //var newGuid = Guid.newGuid();
    //const node = new CampaignChapter(newGuid, 'Test Node')
    // Assert
    //expect(node.Name).toBe('Test Node')
  })

  it('initializes children as an empty array', () => {
    // Arrange
    //var newGuid = Guid.newGuid();
    //const node = new CampaignChapter(newGuid, 'Test Node')
    // Assert
    //expect(node.children).toEqual([])
  })

  it('initializes isActive to true', () => {
    // Arrange
    // var newGuid = Guid.newGuid();
    //const node = new CampaignChapter(newGuid, 'Test Node')
    // Assert
    //expect(node.isActive).toBe(true)
  })
})

describe('StructureNodeModel.addChild', () => {
  it('should add the child to the children array and set the parent reference of the child', () => {
    // Arrange 
    //const parent = new CampaignChapter(Guid.newGuid(), 'parent'); 
    //const child = new CampaignChapter(Guid.newGuid(), 'child');
    // Act 
    //parent.addChild(child);
    // Assert 
    //expect(parent.children.length).toBe(1);
    //expect(parent.children[0]).toBe(child);
    //expect(child.Parent).toBe(parent);
  });

  it('should support adding multiple children', () => {
    //const parent = new CampaignChapter(Guid.newGuid(), 'parent');
    //const child1 = new CampaignChapter(Guid.newGuid(), 'child1');
    //const child2 = new CampaignChapter(Guid.newGuid(), 'child2');
    //parent.addChild(child1); parent.addChild(child2);
    //expect(parent.children).toEqual([child1, child2]);
    //expect(child1.Parent).toBe(parent);
    //expect(child2.Parent).toBe(parent);
  });
});